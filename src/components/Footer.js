import './footer.css'

const Footer = () => {
    return (
        <footer id='footer'>
            <p>
                ALL RIGHTS RESERVED ATAMO ASCENSION 2022
            </p>
            <img src='/LOGO 2.png' />
            <ul className='links'>
                <li>
                    <a href="#">
                        <img src={"/etherscan.svg"} />
                    </a>
                </li>
                <li>
                    <a href="https://medium.com/@atamoascension/the-atamo-ascension-first-stop-98f52ae07f4e">
                        <i class="fab fa-medium text-white"></i>
                    </a>
                </li>
                <li>
                    <a href='/'>
                        <i className='fab fa-twitter text-white' />
                    </a>
                </li>
                <li>
                    <a href='/'>
                        <img src={"/opensea.svg"} className="opensea" />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer