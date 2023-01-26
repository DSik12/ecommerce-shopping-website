/* eslint-disable default-case */
import React, { Component } from 'react'
import Filter from '../components/ProductList/Discount/Filter';

export default class Discount extends Component {

    constructor() {
        super();
        this.apiURL = "https://ecom-app-rest-api-v1.herokuapp.com/products";
        this.lowToHigh = "lowToHigh";
        this.highToLow = "highToLow";
        this.bestSeller = "bestSeller";
        this.featured = "featured";
        this.productApi = null;
        this.checkboxes = [
            { id: "Discount1", discountLabel: "10% or more" },
            { id: "Discount2", discountLabel: "20% or more" },
            { id: "Discount3", discountLabel: "30% or more" },
            { id: "Discount4", discountLabel: "40% or more" },
            { id: "Discount5", discountLabel: "Below 10%" }
        ];
    }

    checkOnlyOne = (checkbox) => {

        const checkboxes = document.getElementsByName("check");
        let flag = null;
        let getProduct = null;
        checkboxes.forEach((item) => {
            if (item !== checkbox) {
                item.checked = false;
            } else {
                getProduct = item;
                flag = item.checked;
            }
        });

        const checkedID = getProduct.id;


        const sortAndChecked = (lowerLimit, upperLimit) => {

            const search = window.location.search;
            if (search) {
                const existingQuery = search.substring(1, search.length);
                if (!existingQuery.includes("discount")) {
                    const productApi = `${existingQuery}&discountApplicable_gte=${lowerLimit}&discountApplicable_lte=${upperLimit}`;
                    this.props.navigate("/products", productApi);
                }
                else {
                    const productApi = existingQuery.replace(/discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*/, `discountApplicable_gte=${lowerLimit}&discountApplicable_lte=${upperLimit}`);
                    this.props.navigate("/products", productApi);
                }
            }
            else {
                const productApi = `discountApplicable_gte=${lowerLimit}&discountApplicable_lte=${upperLimit}`;
                this.props.navigate("/products", productApi);
            }
        };

        if (flag === true) {
            switch (checkedID) {
                case "Discount1":
                    return sortAndChecked(10, 100);
                case "Discount2":
                    return sortAndChecked(20, 100);
                case "Discount3":
                    return sortAndChecked(30, 100);
                case "Discount4":
                    return sortAndChecked(40, 100);
                case "Discount5":
                    return sortAndChecked(0, 10);
            }
        }
        else {
            const search = window.location.search;
            const existingQuery = search.substring(1, search.length);

            if(existingQuery.match(/^discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*/)){
                if(existingQuery.match(/discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*&/)){
                    const productApi = existingQuery.replace(/discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*&/, "");
                    this.props.navigate("/products", productApi);
                }
                else{
                    const productApi = existingQuery.replace(/discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*/, "");
                    this.props.navigate("/products", productApi);
                }
                
            }
            else if(existingQuery.match(/discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*$/)){
                const productApi = existingQuery.replace(/&discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*/, "");
                this.props.navigate("/products", productApi);
            }
            else{
                const productApi = existingQuery.replace(/&discountApplicable_gte=[0-9]*&discountApplicable_lte=[0-9]*/, "");
                this.props.navigate("/products", productApi);
            }
        }
    };

    handleDiscount(event) {
        event.stopPropagation();
        this.checkOnlyOne(event.target);
    }

    render() {

        const checkboxes = this.checkboxes.map((checkbox) => {
            return <Filter id={checkbox.id} discountLabel={checkbox.discountLabel} key={checkbox.id} />
        })
        return (
            <section className="checklist">
                <h3>Filter</h3>
                <h3>DISCOUNT</h3>

                <form className="formcheck" id="discountForm" onChange={this.handleDiscount.bind(this)} data-testid="discountEl">
                    {checkboxes}

                </form>
            </section>

        )
    }
}

