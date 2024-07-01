class Ad {
    constructor({ AdsLogo, BannerAds, SquareAd_1, SquareAd_2, SquareAd_3 }) {
      this.adsLogo = AdsLogo;
      this.bannerAds = BannerAds;
      this.squareAds = {
        SquareAd_1: SquareAd_1,
        SquareAd_2: SquareAd_2,
        SquareAd_3: SquareAd_3,
      };
    }
  
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
  
    setAdsLogo(ad) {
      this.adsLogo = ad;
    }
  
    setBannerAds(ad) {
      this.bannerAds = ad;
    }
  
    setSquareAd1(ad) {
      this.squareAds.SquareAd_1 = ad;
    }
  
    setSquareAd2(ad) {
      this.squareAds.SquareAd_2 = ad;
    }
  
    setSquareAd3(ad) {
      this.squareAds.SquareAd_3 = ad;
    }
  
    // Convert the object to a plain JavaScript object (map) for Firebase
    toMap() {
      return {
        AdsLogo: this.adsLogo,
        BannerAds: this.bannerAds,
        SquareAd_1: this.squareAds.SquareAd_1,
        SquareAd_2: this.squareAds.SquareAd_2,
        SquareAd_3: this.squareAds.SquareAd_3,
      };
    }
  
    // Convert the object to JSON string
    toJson() {
      return JSON.stringify(this.toMap());
    }
  
    // Create an instance of the class from JSON string
    static fromJson(json) {
      const data = JSON.parse(json);
      return new Ad(data);
    }
  
    // Create an instance of the class from a Firebase document data map
    static fromMap(data) {
      const { AdsLogo, BannerAds, SquareAd_1, SquareAd_2, SquareAd_3 } = data;
      return new Ad({
        AdsLogo,
        BannerAds,
        SquareAd_1,
        SquareAd_2,
        SquareAd_3,
      });
    }
  }