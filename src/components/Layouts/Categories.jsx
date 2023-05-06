
import { Link } from 'react-router-dom';
import grain from '../../assets/images/Categories/grain.png'
import fruit from '../../assets/images/Categories/fruit.png'
import vegetable from '../../assets/images/Categories/vegetable.png'
import livestock from '../../assets/images/Categories/livestock.png'
import dairy from '../../assets/images/Categories/diary.png'
import seedoil from '../../assets/images/Categories/seedoil.png'
import fiber from '../../assets/images/Categories/fiber.png'
import herb from '../../assets/images/Categories/herb.png'

const catNav = [
    {
        name: "Grains",
        icon: grain,
    },
    {
        name: "Fruits",
        icon: fruit,
    },
    {
        name: "Vegetables",
        icon: vegetable,
    },
    {
        name: "Livestock",
        icon: livestock,
    },
    {
        name: "Dairy Products",
        icon : dairy,
    },
    {
        name: "Oilseeds",
        icon : seedoil,
    },
    {
        name: "Fiber Crops",
        icon : fiber,
    },
    {
        name: "Medicinal Plants",
        icon : herb,
    },
];

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

            <div className="flex items-center justify-between mt-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
                        <div className="h-16 w-16">
                            <img draggable="false" className="h-full w-full object-contain" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
