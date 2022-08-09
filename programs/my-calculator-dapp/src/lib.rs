use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod my_calculator_dapp {
    use super::*;
    //solana is stateless
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    } 
}

#derive(Accounts)
pub struct create<'info> {
    //init because creating new acct
    #[account(init, player=user, space=264)]
    pub calculator: Account<'info, Calculator>,

    //need to sign the transaction for account creation 
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

//what we might get back from Calculator
#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64
}