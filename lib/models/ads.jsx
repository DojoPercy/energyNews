class Ad {
  constructor({ adsLogo = '', bannerAds = '', squareAds = {} }) {
    this.adsLogo = adsLogo;
    this.bannerAds = bannerAds;
    this.squareAds = {
      SquareAd_1: squareAds.SquareAd_1 || '',
      SquareAd_2: squareAds.SquareAd_2 || '',
      SquareAd_3: squareAds.SquareAd_3 || '',
    };
  }

  // Methods to access properties
  getAdsLogo() {
    return this.adsLogo;
  }

  getBannerAds() {
    return this.bannerAds;
  }

  getSquareAd1() {
    return this.squareAds.SquareAd_1;
  }

  getSquareAd2() {
    return this.squareAds.SquareAd_2;
  }

  getSquareAd3() {
    return this.squareAds.SquareAd_3;
  }

  // Convert the object to a plain JavaScript object (map) for Firebase
  toMap() {
    return {
      adsLogo: this.adsLogo,
      bannerAds: this.bannerAds,
      squareAds: this.squareAds,
    };
  }

  // Create an instance of the class from JSON string
  static fromJson(json) {
    const data = JSON.parse(json);
    return new Ad(data);
  }

  // Create an instance of the class from a Firebase document data map
  static fromMap(data) {
    const { adsLogo, bannerAds, squareAds } = data;
    return new Ad({ adsLogo, bannerAds, squareAds });
  }
}

export default Ad;
