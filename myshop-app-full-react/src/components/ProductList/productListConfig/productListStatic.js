import clothes from '../../../assets/images/clothes.png';
import furniture from '../../../assets/images/furniture.png';
import game from '../../../assets/images/game.png';
import music from '../../../assets/images/music.png';
import garden from '../../../assets/images/garden.png';
import food from '../../../assets/images/food.png';
import health from '../../../assets/images/health.png';
import beauty from '../../../assets/images/beauty.png';
import sports from '../../../assets/images/sports.png';
import auto from '../../../assets/images/auto.png';

const categoryList = [{ category: clothes, subCategory: ["For Men", "For Women", "For Kids"], spanEle: ["Clothing,Shoes", "Accessories"] }, { category: furniture, subCategory: ["Home", "Furniture", "Appliances"], spanEle: ["Home, Furniture", "Appliances"] }, { category: game, subCategory: ["Toys", "Controller", "Gaming CD"], spanEle: ["Toys", "Video Game"] }, { category: music, spanEle: ["Movies Music", "Books"] }, { category: garden, spanEle: "Gardening" }, { category: food, spanEle: ["Food,Household", "Pets"] }, { category: health, subCategory: ["Medicines", "Checkup", "Machines"], spanEle: ["Pharmacy", "Healthcare"] }, { category: beauty, subCategory: ["Gold", "Silver", "Beauty Products"], spanEle: ["Beauty", "Jwelery"] }, { category: sports, spanEle: ["Sports,Fitness", "Outdoors"] }, { category: auto, spanEle: ["Auto,Tyres", "Industrial"] }];

const categories = ["clothes", "furniture", "game", "health", "beauty"];

const lowToHigh = "lowToHigh";
const highToLow = "highToLow";
const bestSeller = "bestSeller";
const featured = "featured";

export {categoryList, categories, lowToHigh, highToLow, bestSeller, featured}