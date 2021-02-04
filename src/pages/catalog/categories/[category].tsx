import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from  'next/router';

interface IProduct {
    id: string;
    title: string;
}

interface CategoryProps {
    products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
    const router = useRouter();
    
    if (router.isFallback) {
        <p>Carregando...</p>
    }

    return (
        <div>
            <h1>{router.query.category}</h1>
    
            <ul>
                {products.map(recommendedProduct => {
                    return (
                        <li key={recommendedProduct.id}>
                            {recommendedProduct.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { category: category.id }
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { category } = context.params;

    const response = await fetch(`http://localhost:3333/products?category_id=${category}`);
    const products = await response.json();

    return {
        props: {
            products,
        },
        revalidate: 60,
    }
}