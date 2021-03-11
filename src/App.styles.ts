import styled, {createGlobalStyle} from 'styled-components'
import BGImage from './img/bg.jpg'

export const Style=createGlobalStyle`
    html{
        height:100%
    }

    body{
        background-image:url(${BGImage});
        background-size:cover;
        margin:0;
        padding:0 20px;
        display:flex;
        justify-content:center;
    }

    * {
        box-sizing:border-box;
        font-family:'Pacifico',sans-serif
    }

`;

export const Wrapper=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;

    >p{
        color:gray;
    }

    .score{
        color:#0085a3;
        font-size: 2rem;
        margin:0;
    }

    h1{
        filter:drop-shadow(2px 2px #0085a3);
        font-size:60px;
        text-align:center;
        font-weight:400;
    }

    h3{
        font-size:15px;
        font-weight:200;
    }

    h4{
        font-size:20px;
        font-weight:200;
        background-color:white;
    }

    .start, .next{
        cursor:pointer;
        background: linear-gradient(180deg,#ffff,#ffcc91);
        border:2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
        border-radius:10px;
        height:40px;
        margin: 20px 0;
        padding:0 40px;
    }

    .start{
        max-width:200px;
    }

`