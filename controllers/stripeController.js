
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51RCYCV2eixGtcXXid94y771vpcIzbnMptO3PiZ22gQMBpkbuBciGxZOsOLfmBLhL0jQnLsP9k5goa4rSGIFpHIpl00jgVbJshF'); // Remplacer par ta clé Stripe test
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId, dishName, quantity, deliveryAddress } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).send({
        success: false,
        error: 'Le montant de paiement doit être un nombre valide supérieur à zéro.',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card'],
      description: `Paiement pour commande #${orderId || 'inconnue'}`,
      metadata: {
        order_id: orderId || 'non spécifié',
        dish: dishName || 'non spécifié',
        quantity: quantity?.toString() || '1',
        address: deliveryAddress || 'non spécifiée',
        total: `${(amount / 100).toFixed(2)} EUR`,
      },
    });

    return res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      message: 'Votre paiement est prêt à être confirmé.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      error: 'Impossible de créer un Intent de paiement.',
      details: err.message,
    });
  }
};
