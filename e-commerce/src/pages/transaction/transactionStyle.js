import styled from "styled-components";

export const Container = styled.div`

`

export const LineDecorator = styled.div`
    height: 3px;
    width: 100%;
    background-position-x: -30px;
    background-size: 116px 3px;
    background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px);
`

export const Section = styled.div`
    padding: 28px 30px 24px;
    background: #fff;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    border-radius: 3px;
    &>div {
        display: flex;
        align-items: center;
    }
    & .detail {
        display: flex;
        align-items: center;
        font-size: 1.125rem;
        color: #ee4d2d;
        margin-bottom: 20px;
        text-transform: capitalize;
    }

    & span.detail-main {
        font-weight: 700;
        color: #222;
        margin-right: 10px;
    }
    & span.change-btn {
        color: #4080ee;
        text-transform: capitalize;
        margin-left: 2.5rem;
        cursor: pointer;
        font-size: 13px;
    }

    & .wrapper {
        display: flex;
        align-items: center;
        & .row-head {
            width: 100%;
            height: 30px;
            font-size: 14px;
            color: #bbb;
            & .first-item {
                justify-content: flex-start;
                text-align: left;
                &>div {
                    display: flex;
                    align-items: center;
                    font-size: 18px;
                    color: #222;
                }
            }
            & .space-item {
                flex: 2;
                justify-content: center;
                text-align: center;
            }

            & .item {
                lex: 1;
                justify-content: center;
                text-align: center;
                font-size: 14px;
                color: #bbb;
            }
            & .last-item {
                justify-content: flex-end;
                text-align: right;
                flex: 2;
            }
        }
    }

`

export const Spacer = styled.div`
    margin: ${({margin}) => margin};
`

export const Title = styled.div`
    margin-left: 0.9375rem;
    border-left: 0.0625rem solid #ee4d2d;
    color: #ee4d2d;
    font-size: 1.25rem;
    line-height: 1.875rem;
    height: 1.875rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.0625rem;
    text-transform: capitalize;
`

export const Text = styled.div`
    margin-left: 1.2rem;
    color: #000;
    font-size: 1rem;
    line-height: 1.875rem;
    height: 1.875rem;
    padding-left: 0.9375rem;
    margin-bottom: 0.0625rem;
    text-transform: capitalize;
`

export const Image = styled.img`
    display: inline-block;
`

export const Input = styled.input`
    padding: 10px 12px;
    border: 1px solid #999;
    outline: none;
    border-radius: 4px;
    width: 40%;
`

export const ButtonSmall = styled.button`
    color: #fff;
    position: relative;
    overflow: visible;
    outline: 0;
    background: #ee4d2d;
    height: 40px;
    padding: 0 20px;
    min-width: 70px;
    max-width: 220px;
    cursor: pointer;
    border-radius: 2px;
    margin-left: 160px;
`