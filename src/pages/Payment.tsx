import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Building2, Check } from 'lucide-react';
import { Pack } from '../data';

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const pack = location.state?.pack as Pack;
  const [paymentMethod, setPaymentMethod] = useState<'rib' | 'paypal'>('paypal');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!pack) {
    navigate('/packs');
    return null;
  }

  const handlePayment = async () => {
    setLoading(true);

    setSuccess(true);
    setTimeout(() => navigate('/'), 3000);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20 text-center">
          <div className="mb-6">
            <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Demande enregistrée !</h2>
            <p className="text-amber-100/80">
              Votre demande d'abonnement a été enregistrée. Vous allez être redirigé...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Paiement</h1>
          <p className="text-amber-100/80">Finalisez votre abonnement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Récapitulatif</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-amber-100/80">Pack sélectionné:</span>
                <span className="text-amber-300 font-semibold">{pack.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-100/80">Durée:</span>
                <span className="text-amber-300 font-semibold">{pack.duration_months} mois</span>
              </div>
              <div className="border-t border-amber-500/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-100/80 text-lg">Total:</span>
                  <span className="text-amber-400 font-bold text-2xl">{pack.price}€</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-950/50 p-4 rounded-lg border border-amber-500/20">
              <h3 className="text-amber-300 font-semibold mb-2">Inclus dans votre pack:</h3>
              <ul className="space-y-2">
                {(pack.features as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-100/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-800/80 to-indigo-900/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/20">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Mode de paiement</h2>

            <div className="space-y-4 mb-8">
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-6 w-6 text-amber-400" />
                  <div className="text-left">
                    <div className="text-amber-300 font-semibold">PayPal</div>
                    <div className="text-amber-100/60 text-sm">Paiement sécurisé</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('rib')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'rib'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-6 w-6 text-amber-400" />
                  <div className="text-left">
                    <div className="text-amber-300 font-semibold">Virement bancaire</div>
                    <div className="text-amber-100/60 text-sm">Par RIB</div>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'paypal' && (
              <div className="bg-purple-950/50 p-6 rounded-lg border border-amber-500/20 mb-6">
                <h3 className="text-amber-300 font-semibold mb-3">Paiement PayPal</h3>
                <p className="text-amber-100/70 text-sm mb-4">
                  Vous allez être redirigé vers PayPal pour effectuer votre paiement de manière
                  sécurisée.
                </p>
                <a
                  href={`https://www.paypal.com/paypalme/mysticvision/${pack.price}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-center"
                >
                  Payer avec PayPal
                </a>
              </div>
            )}

            {paymentMethod === 'rib' && (
              <div className="bg-purple-950/50 p-6 rounded-lg border border-amber-500/20 mb-6">
                <h3 className="text-amber-300 font-semibold mb-3">
                  Informations de virement bancaire
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-amber-100/60">Titulaire:</span>
                    <span className="text-amber-300 ml-2">Mystic Vision SARL</span>
                  </div>
                  <div>
                    <span className="text-amber-100/60">IBAN:</span>
                    <span className="text-amber-300 ml-2">FR76 1234 5678 9012 3456 7890 123</span>
                  </div>
                  <div>
                    <span className="text-amber-100/60">BIC:</span>
                    <span className="text-amber-300 ml-2">ABCDEFGH</span>
                  </div>
                  <div>
                    <span className="text-amber-100/60">Montant:</span>
                    <span className="text-amber-300 ml-2">{pack.price}€</span>
                  </div>
                  <div>
                    <span className="text-amber-100/60">Référence:</span>
                    <span className="text-amber-300 ml-2">
                      {pack.name.replace(/\s+/g, '-').toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-amber-100/60 text-xs mt-4">
                  Veuillez inclure la référence dans votre virement. Votre abonnement sera activé
                  sous 48h après réception du paiement.
                </p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-purple-950 font-bold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-950 mr-2"></div>
                  Enregistrement...
                </span>
              ) : (
                'Confirmer la demande'
              )}
            </button>

            <p className="text-amber-100/50 text-xs text-center mt-4">
              En continuant, vous acceptez nos conditions générales de vente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
