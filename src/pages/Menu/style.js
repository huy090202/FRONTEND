import styled from 'styled-components';

export const WrapperMenuScroll = styled.div`
    height: calc(104vh - 100px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #6699BB;
        border-radius: 10px;
    }
`;

export const WrapperCartScroll = styled.div`
    height: calc(60vh - 100px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #6699BB;
        border-radius: 10px;
    }
`;
