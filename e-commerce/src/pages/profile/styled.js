import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 60px;
`;

export const Wrapper = styled.div`
    background: #fff;
    border-radius: 4px;
    padding: 10px 20px 60px;
    place-items: center;
`;

export const Text = styled.h2`
    font-size: 24px;
    font-weight: 400;
`

export const Description = styled.span`
    font-size: 13px;
    color: grey;
`

export const LineSpacer = styled.div`
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    background: rgba(0, 0, 0, .1);
` 

export const Spacer = styled.div`
    margin: ${({margin}) => margin};
`

export const Flex = styled.div`
    display: flex;
    column-gap: 40px;
`

export const Column = styled.div`
    flex: ${({flex}) => flex};
    row-gap: 10px;
    & .img {
        width: 10.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    & .img>img {
        width: 120px;
        height: 120px;
        object-fit: cover;
    }
`

export const Row = styled.div`

`

export const Form = styled.form`

`

export const Group = styled.div`
    display: flex;
    margin-bottom: 20px;
    &>div:first-child {
        width: 150px;
        margin-right: 10px;
        text-transform: capitalize;
        color: rgba(85,85,85,.8);
        text-align: right
    }
    & .radio-group {
        display: flex;
        & .radio-button {
            display: flex;
            column-gap: 4px;
            margin-right: 20px;
        }
    }
`

export const Input = styled.input`
    padding: 10px 12px;
    border: 1px solid #999;
    outline: none;
    border-radius: 4px;
    width: 100%;
`

export const Button = styled.button`
    color: #fff;
    position: relative;
    overflow: visible;
    background: #ee4d2d;
    height: 40px;
    padding: 0 20px;
    min-width: 120px;
    max-width: 220px;
    cursor: pointer;
    border-radius: 2px;
    margin-left: 136px;
`
export const Span = styled.span`
    color: #fff;
    position: relative;
    overflow: visible;
    background: #ee4d2d;
    height: 40px;
    padding: 10px 20px;
    min-width: 120px;
    max-width: 220px;
    cursor: pointer;
    border-radius: 2px;
    margin-left: 136px;
`

