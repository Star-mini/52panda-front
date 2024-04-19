const defaultIconProps = {
  width: "16",
  height: "16",
  fill: "currentColor"
};

export const XCicleFillIcon = ({
  width = defaultIconProps.width,
  height = defaultIconProps.height,
  fill = defaultIconProps.fill
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
    </svg>
  );
}

export const CameraFillIcon = ({
  width = defaultIconProps.width,
  height = defaultIconProps.height,
  fill = defaultIconProps.fill
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill} class="bi bi-camera-fill" viewBox="0 0 16 16">
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}