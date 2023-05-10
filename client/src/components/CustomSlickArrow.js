import React from "react";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import clsx from "clsx";
import styles from "./CustomSlickArrow.module.scss";

// Cho banner
export const NextArrowBanner = (props) => {
  const { onClick } = props;
  return (
    <button className={clsx(styles.next_banner)} onClick={onClick}>
      <BsChevronRight />
    </button>
  );
};
export const PrevArrowBanner = (props) => {
  const { onClick } = props;

  return (
    <button className={clsx(styles.prev_banner)} onClick={onClick}>
      <BsChevronLeft />
    </button>
  );
};

// Các section main
export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className={clsx(styles.nextArrow)} onClick={onClick}>
      <BsChevronRight />
    </button>
  );
};
export const PrevArrow = (props) => {
  const { onClick } = props;

  return (
    <button className={clsx(styles.prevArrow)} onClick={onClick}>
      <BsChevronLeft />
    </button>
  );
};
