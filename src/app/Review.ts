export class Review {
  constructor(
    public nickname: string,
    public reviewText: string,
    public purchaseDate?: Date
  ) {}
}
