import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Faq from "react-faq-component";

const data = {
    title: "FAQs",
    rows: [
        {
            title: "When are the tokens distributed?",
            content: "The token contract is established on the blockchain after successful funding of the project. Once the token contract is established, tokens will be distributed to donators.",
        },
        {
            title: "How long will my token be usable as a product voucher?",
            content:
                "When the crator succesfully finishes the project, it its flagged on the TokenStart platform. Once it is flagged donators have x years to redeem their vouchers.",
        },
        {
            title: "What are the costs when using TokenStart as a creator?",
            content: "Creators will be charged a percentage fee if the project succeeds. Additional cost is the creation of the token contract which varies depending on the blockchain used.",
        },
        {
            title: "Are the tokens regulated as financial instruments?",
            content: "No. Tokens distributed on TokenStart do not represent financial instruments. They are vouchers or collectibles.",
        },
    ],
};
 
const styles = {
    // bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
    rowContentPaddingLeft: '10px'
};
 
const config = {
    // animate: true,
    // arrowIcon: "V",
};
 
export default function FAQs() {
        return (
            <div>
               <Faq data={data} styles={styles} config={config} />
            </div>
        );
}