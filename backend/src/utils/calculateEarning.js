const calculateEarning = (totalPrice) => {

       const companyProfit = Number((totalPrice * 0.10).toFixed(1));
    const technicianEarning = Number((totalPrice - companyProfit).toFixed(1));


    return {
        companyProfit,
        technicianEarning
    }
};

export { calculateEarning };