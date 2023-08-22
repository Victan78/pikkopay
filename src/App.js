import React, { useEffect, useState } from 'react';
import './App.css';
import cadenas from './cadenas.svg';
import Nameinput from './nameInput';
import logo from './icon.svg';

const PaygreenPayment = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const style = {
    input: {
      base: {
        color: 'black',
        fontSize: '18px',
      },
      hover: {
        color: 'grey',
      },
      focus: {
        color: 'grey',
      },
      invalid: {
        color: 'red',
      },
      placeholder: {
        base: {
          color: 'grey',
        },
      },
    },
    checkbox: {
      label: {
        base: {
          color: 'black',
        },
        unchecked: {
          color: 'rgb(255, 179, 0)',
        },
      },
      box: {
        base: {
          color: 'black',
          hover: {
            color: 'rgb(255, 179, 0)',
          },
        },
        unchecked: {
          color: 'red',
        },
      },
    },
  };

  useEffect(() => {
    const scriptJS = document.createElement('script');
    const linkCSS = document.createElement('link');

    scriptJS.src = 'https://sb-pgjs.paygreen.fr/latest/paygreen.min.js';
    scriptJS.onload = () => setScriptLoaded(true);
    scriptJS.onerror = () => setLoadError('Failed to load the Paygreen script.');
    document.body.appendChild(scriptJS);

    linkCSS.href = 'https://sb-pgjs.paygreen.fr/latest/paygreen.min.css';
    linkCSS.type = 'text/css';
    linkCSS.rel = 'stylesheet';
    document.head.appendChild(linkCSS);

    return () => {
      document.body.removeChild(scriptJS);
      document.head.removeChild(linkCSS);
    };
  }, []);

  const handlePay = () => {
    if (window.paygreenjs) {
      document.querySelector('.button').classList.toggle('hidden');
      document.querySelector('.loader').classList.add('visible');
      window.paygreenjs.submitPayment();
    }
  };

  useEffect(() => {
    if (!scriptLoaded || loadError) return;

    const initPGJS = () => {
      if (!window.paygreenjs) {
        setLoadError('PaygreenJS is not available.');
        return;
      }

      window.paygreenjs.attachEventListener(window.paygreenjs.Events.PAN_FIELD_FULFILLED, () => {
        console.log('pan fullfilled');
        window.paygreenjs.focus('cvv');
      });

      window.paygreenjs.attachEventListener(window.paygreenjs.Events.CVV_FIELD_FULFILLED, () => {
        window.paygreenjs.focus('exp');
      });

      window.paygreenjs.init({
        publicKey: 'pk_6d92047e838d4870b74857ba47e2eebd',
        mode: 'instrument',
        paymentMethod: 'conecs',
        style,
        modeOptions: {
          shopId: 'sh_69b974d635c34df18c807baed0794836',
        },
      });
    };

    initPGJS();
  }, );

  if (loadError) {
    return <p>Error: {loadError}</p>;
  }

  return (
    <div>
      <div id="paygreen-container"></div>
      <div id="paygreen-methods-container"></div>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="pay-form">
        <div className='titre'><h3>Regler en ligne</h3></div>
        <div>
          <Nameinput/>
        </div>
        <div>
          <label>Numero de la carte</label>
          <div id="paygreen-pan-frame"></div>
        </div>
        <div className="line">
          <div>
            <label>Cryptogramme visuel</label>
            <div id="paygreen-cvv-frame"></div>
          </div>
          <div>
            <label>Date d'expiration</label>
            <div id="paygreen-exp-frame"></div>
          </div>
        </div>
        <div id="paygreen-reuse-checkbox-container"></div>
        <button id="payButton" className="button" onClick={handlePay}>
          Payer<img src={cadenas} alt='cadenas' />
        </button>
        <div className='loader'><div className='load'></div></div>
        <div className="icon-sentence">
          <i data-feather="lock"></i>
          <label className="secured-label"> Paiement sécurisé et alimenté par  <strong>Paygreen</strong></label>
        </div>
      </div>
    </div>
  );
};

export default PaygreenPayment;
