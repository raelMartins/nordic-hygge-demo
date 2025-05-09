import {
  Slider as CSlider,
  Rail,
  Handles,
  Tracks,
  Ticks,
} from "react-compound-slider";
import { Handle } from "./components/handle";
import { Track } from "./components/track";
import { color } from "../../../theme/colors";

const sliderStyle = {
  // Give the slider some width
  position: "relative",
  width: "100%",
  height: 80,
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 2,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: color.primaryDark,
};

export const Slider = ({ domain, selectedRange, onRangeUpdate }) => {
  return (
    <CSlider
      rootStyle={sliderStyle}
      step={1000}
      mode={2}
      domain={domain}
      values={selectedRange}
      onUpdate={onRangeUpdate}
    >
      <Rail>
        {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
    </CSlider>
  );
};
