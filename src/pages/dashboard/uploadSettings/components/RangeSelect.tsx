import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { PRIMARY_COLOR } from '../../../../utils/colors';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RangeSelectProps {
  values: number[];
  onChange: (values: number[]) => void;
  min: number;
  disabled?: boolean;
  max: number;
  step: number;
  rtl?: boolean;
  RenderItem?: React.ReactElement;
}

const RangeSelect: React.FC<RangeSelectProps> = ({ min, max, disabled, rtl, step, values, onChange }) => {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Range
        values={values}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        rtl={rtl}
        onChange={onChange}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '16px',
              width: '5px',
              backgroundColor: index * step < values[0] ? PRIMARY_COLOR : '#ccc'
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: values,
                  colors: [PRIMARY_COLOR, '#ccc'],
                  min: min,
                  max: max,
                  rtl
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? PRIMARY_COLOR : '#CCC'
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: '30px' }}>{values[0].toFixed(1)}</output>
    </div>
  )
}

export default RangeSelect