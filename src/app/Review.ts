export class Review {
  constructor(
    public tripId: string,
    public nickname: string,
    public reviewText: string,
    public purchaseDate?: Date
  ) {}
}
