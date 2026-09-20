export interface CatalogProduct {
  id: string;
  name: string;
  priceCents: number;
  inventory?: { inStock: boolean; quantity: number };
}

export interface LoanSchedule {
  loanId: string;
  installments: Array<{ installmentNumber: number; totalCents: number }>;
}

export class SharedApiClient {
  private baseUrl: string;
  private callerService: string;

  constructor(baseUrl: string, callerService: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.callerService = callerService;
  }

  async getProduct(id: string): Promise<CatalogProduct> {
    const res = await fetch(`${this.baseUrl}/v1/products/${id}`, {
      headers: { "x-caller-service": this.callerService },
    });
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
    return (await res.json()) as CatalogProduct;
  }

  async getLoanSchedule(loanId: string): Promise<LoanSchedule> {
    const res = await fetch(`${this.baseUrl}/v1/loans/${loanId}/schedule`, {
      headers: { "x-caller-service": this.callerService },
    });
    if (!res.ok) throw new Error(`Failed to fetch schedule: ${res.status}`);
    return (await res.json()) as LoanSchedule;
  }
}
