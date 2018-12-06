const Blockchain = require('./index');
const Block = require('./block');

describe('Blockhain',()=>{
  let bc, bc2;

  beforeEach(()=>{
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('start with the genesis block',()=>{
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block',()=>{
    const data = 'foo';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data);
  });

  it('validates a valid chain',()=>{
    bc2.addBlock('foo0');

    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalida a chain with a corrupt genesis block',()=>{
    bc2.chain[0].data = 'Mal data';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })

  it('invalid a corrupt chain', ()=>{
    bc2.addBlock('foo');
    bc2.chain[1].data = 'not foo';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  })

  it('replces the chain with a valid chain',()=>{
    bc2.addBlock('goobar');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });

  it('does not replace the chain with a lesser or parallel chain',()=>{
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);
    expect(bc.chain).not.toEqual(bc2.chain);
  });

});