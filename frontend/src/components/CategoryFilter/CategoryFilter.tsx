import {Chip, Wrapper} from "./CategoryFilter.styled.ts";
import type {Category} from "../../types/category.ts";
import type { ReactNode } from "react";
import { FaThLarge, FaTshirt, FaGem } from "react-icons/fa";
import {GiTrousers} from "react-icons/gi";
import {IoShirtSharp} from "react-icons/io5";

interface Props {
    selected: Category;
    onChange: (cat: Category) => void;
}

const categories: { label: Category; icon: ReactNode }[] = [
    { label: 'All Categories', icon: <FaThLarge /> },
    { label: 'Tops', icon: <FaTshirt /> },
    { label: 'Bottoms', icon: <GiTrousers /> },
    { label: 'Outerwear', icon: <IoShirtSharp /> },
    { label: 'Accessories', icon: <FaGem /> },
];

const CategoryFilter = ({ selected, onChange }: Props) => {
    return (
        <Wrapper>
            {categories.map(({ label, icon }) => (
                <Chip key={label} active={selected === label} onClick={() => onChange(label)}>
                    <span>{icon}</span>
                    {label}
                </Chip>
            ))}
        </Wrapper>
    );
};

export default CategoryFilter;
