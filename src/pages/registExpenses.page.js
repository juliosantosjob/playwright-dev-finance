import { expect } from '@playwright/test';

export class RegistExpensesPage {

  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('dev.finance$');
  }

  async selectNewTransaction() {
    await this.page.locator('a')
      .filter({ hasText: 'Nova Transação' }).click();
  }

  async registerExpense(expense) {
    await this.page.fill('#description', expense.description);
    await this.page.fill('#amount', expense.amount);
    await this.page.fill('#date', expense.date);
    await this.page.locator('button')
      .filter({ hasText: 'Salvar' }).click();
  }

  async itRegistered(expense) {
    const expenseDate = expense.date.split('-').reverse().join('/');

    const expenseRequirements = [
      { hasText: expense.description },
      { hasText: expense.amount },
      { hasText: expenseDate }
    ];

    for (let indix = 0; indix < expenseRequirements.length; indix++) {
      await expect(this.page.locator('tr', expenseRequirements[indix]))
        .toBeVisible();
    }
  }

  async removeRegister(expense) {
    await this.page.locator('tr')
      .filter({ hasText: expense.description })
      .locator('img')
      .click();
  }

  async verifyExpenseRemoved(expense) {
    await expect(this.page.locator('tr', { hasText: expense.description }))
      .toBeHidden();
  }
}
