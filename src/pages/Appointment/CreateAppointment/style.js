import { Select } from 'antd';
import styled from 'styled-components';

export const WrapperSelect = styled(Select)`
    color: black !important;
    background-color: transparent !important;

    .ant-select-selector {
        background-color: transparent !important;
        box-shadow: none !important;
        color: black;

        &:hover {
            background-color: transparent !important;
            border-color: #d6d6d6 !important;
        }
    }

    .ant-select-dropdown {
        background-color: transparent !important;
    }
`