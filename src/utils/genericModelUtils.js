const Utilities = require("./util");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

class GenericUtilities {
    constructor () {
        this.utils = new Utilities();
    }

    async stripePayment(body) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: body.amount,
                currency: body.currency,
                payment_method_types: body.paymentMethod
            });
            return paymentIntent;
        } catch (error) {
            throw error;
        }
    }

    async stripePaymentRetrieve(body) {
        try {
            const paymentIntentRetrieve = await stripe.paymentIntents.retrieve(body.paymentIntentId);
            return paymentIntentRetrieve;
        } catch (error) {
            throw error;
        }
    }

    async modelById(model, ID, populate, selectField, assort) {
        try {
            var entityFind = await model
                .findById(ID)
                .select(selectField)
                .sort(assort)
                .populate(populate);
            if (entityFind) return entityFind.transform();
            return null;
        } catch (error) {
            throw error;
        }
    }

    async findInModel(model, condition, populate, selectField, assort) {
        try {
            var entityFind = await model
                .find(condition)
                .select(selectField)
                .sort(assort)
                .populate(populate);
            if (entityFind) return entityFind.transform();
            return null;
        } catch (error) {
            throw error;
        }
    }

    async findOneInModel(model, condition, populate, selectField, assort) {
        try {
            var entityFind = await model
                .findOne(condition)
                .select(selectField)
                .sort(assort)
                .populate(populate);
            if (entityFind) return entityFind.transform();
            return null;

        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdateInModel(model, condition, updateData, populate, selectField, assort) {
        try {
            var entityFind = await model
                .findOneAndUpdate(condition, updateData, { new: true })
                .select(selectField)
                .sort(assort)
                .populate(populate);
            if (entityFind) return entityFind.transform();
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GenericUtilities;
