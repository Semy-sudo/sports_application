import "./scroll.style.css";
import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";

const InfiniteScroll = ({
  next,
  hasMore,
  scrollTarget,
  onScroll,
  height,
  loader,
  dataLength,
  children
}) => {
  const [showLoader, setShowLoader] = useState(false);
  //const [triggered, setTriggered] = useState(false);
  let triggered = useRef(false);

  const getScrollTarget = () => {
    if (scrollTarget instanceof HTMLElement) return scrollTarget;
    if (typeof scrollTarget === "string")
      return document.getElementById(scrollTarget);
    if (scrollTarget === null)
      console.warn("scrollTarget is null. Please add target element into DOM.");

    return null;
  };

  const _scrollTarget = getScrollTarget();

  const isAtBottom = (target, scrollThreshold) => {
    const clientHeight =
      target === document.body || target === document.documentElement
        ? window.screen.availHeight
        : target.clientHeight;
    //return Math.abs(target.scrollTop + clientHeight - target.scrollHeight) < 1;
    return (
      target.scrollTop + clientHeight >= scrollThreshold * target.scrollHeight
    );
  };

  useEffect(() => {
    triggered.current = false;
    //setTriggered(false);
    setShowLoader(false);
  }, [dataLength]);

  /**
   * 함수형 컴포넌트의 클로저로 인해 next, hasMore, onScroll과 같이 State를 가질 수 있는 props를 useRef로 두어 현재 값을 참조하도록 하였음
   */
  const props = useRef({
    next,
    hasMore,
    onScroll
  });

  const scrollListener = e => {
    const { next, hasMore, onScroll } = props.current;
    if (typeof onScroll === "function") {
      setTimeout(() => onScroll && onScroll(e), 0);
    }

    const target =
      height || _scrollTarget
        ? e.target
        : document.documentElement.scrollTop
        ? document.documentElement
        : document.body;

    if (triggered.current) {
      return;
    }

    const atBottom = isAtBottom(target, 1);

    if (atBottom && hasMore) {
      //setTriggered(true);
      triggered.current = true;
      setShowLoader(true);
      next && next();
    }
  };

  useEffect(() => {
    props.current = {
      next,
      hasMore,
      onScroll
    };
  }, [next, hasMore, onScroll]);

  const throttleScrollListener = throttle(scrollListener, 150);

  const _infScroll = useRef();

  useEffect(() => {
    const el = height ? _infScroll.current : _scrollTarget || window;

    if (el) {
      el.addEventListener("scroll", throttleScrollListener);
      return () => el.removeEventListener("scroll", throttleScrollListener);
    }
  }, []);

  return (
    <div
      className="scroll_wrapper"
      style={{ height: height || "auto" }}
      ref={_infScroll}
    >
      {children}
      {!showLoader && hasMore && loader}
      {showLoader && hasMore && loader}
    </div>
  );
};

export default InfiniteScroll;
