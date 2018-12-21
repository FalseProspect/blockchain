const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', ()=>{
  let transaction, wallet, recipient, amount;

  beforeEach(()=>{
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('Outputs the amount withdrawn from wallet balance', ()=>{
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
    .toEqual(wallet.balance - amount);
  });

  it('Outputs the amount deposited to recipient', ()=>{
    expect(transaction.outputs.find(output => output.address === recipient).amount)
    .toEqual(amount);
  })

  it('Inputs the balance of the wallet',()=>{
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('Validates a valid transaction', ()=>{
    expect(Transaction.verfiyTransaction(transaction)).toBe(true);
  });

  it('Invalidates a corrupt tranaction', ()=> {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verfiyTransaction(transaction)).toBe(false);
  })

  //Overdrawing
  describe('Transaction exceeds the sender wallet balance',()=>{
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('Does not create the transaction if sender will overdrawn amount', ()=>{
      expect(transaction).toEqual(undefined);
    })
  })

})