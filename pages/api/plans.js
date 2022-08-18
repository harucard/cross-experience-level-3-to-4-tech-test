const plans = require('../../resources/data/available-plans.json');

const getPlans = (_req, res) => {
    try {
        res.status(200).json(plans)
    }catch(error) {
        res.status(500).json([{statusCode:500, message:error.message}])
    }
}

export default getPlans; 