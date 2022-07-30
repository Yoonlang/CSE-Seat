import React from 'react';
import { render } from '@testing-library/react'
import Footer from '../components/organisms/Footer.jsx'

it("test", () => {
    const { getByText } = render(<Footer/>);
    const contact = getByText("Contact : pove2019@gmail.com");
    expect(contact).toBeInTheDocument();
})
