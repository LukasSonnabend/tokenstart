import React from "react";

export default function ChainIcons(chain) {
    switch (chain) {
        case "Ethereum":
            return <img class="tokenIcon" src="https://upload.wikimedia.org/wikipedia/commons/7/70/Ethereum_logo.svg" />
        case "TRON":
            return <img class="tokenIcon" src="https://banner2.cleanpng.com/20180824/vuw/kisspng-cryptocurrency-blockchain-tron-logo-ethereum-top-2-ethereum-tokens-to-invest-in-bit-world-5b7f9cbfb1e3f4.7066100315350898557287.jpg" />
        case "EOS":
            return <img class="tokenIcon" src="https://ethereum-balance.de/img/token/eos_1.png"/>
        case "Polkadot":
            return <img class="tokenIcon" src="https://polkadot.network/content/images/2019/05/Polkadot_symbol_color.png"/>
    }
}