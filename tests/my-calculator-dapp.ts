const assert = require('assert');
const anchor = require('@project-serum/anchor');
const {SystemProgram} = anchor.web3

describe('mycalculator', () => {
    const provider = anchor.Provider.local();
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    //allows us to call methods made on solana 
    const program = anchor.workspace.mycalculatordapp

    it('Creates a calculator', async () => {
        await program.toPrecision.create("Welcome to Solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome to Solana");
    });

    it('Adds 2 numebrs', async () => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.equal( new anchor.BN(5)));
    });

    it('Multiply 2 numebrs', async () => {
        await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.equal( new anchor.BN(6)));
    });

    it('Subtract 2 numebrs', async () => {
        await program.rpc.multiply(new anchor.BN(3), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.equal( new anchor.BN(1)));
    });

    it('Divide 2 numebrs', async () => {
        await program.rpc.multiply(new anchor.BN(3), new anchor.BN(2), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.equal( new anchor.BN(1)));
        assert.ok(account.remainder.equal( new anchor.BN(1)));
    });
    
})