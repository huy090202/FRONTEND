import React from 'react';
import PropTypes from 'prop-types';

const Switch = React.forwardRef((props, ref) => {
    const { checked = false, onChange } = props;

    return (
        <button
            ref={ref}
            type='button'
            role='switch'
            data-state={checked ? 'checked' : 'unchecked'}
            className='group flex p-0.5 data-[state=checked]:bg-green-600 cursor-pointer w-20 h-9 rounded-full bg-gray-200 box-content transition-colors duration-150 shadow'
            onClick={() => onChange(!checked)}
        >
            <span className='pointer-events-none inline-flex size-9 bg-white rounded-full shadow-inset transition-transform group-data-[state=checked]:translate-x-11'></span>
        </button>
    );
});

Switch.displayName = 'Switch';
Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default Switch;
