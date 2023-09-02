import db from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
    phone: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}


async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName,
                    phone: author.phone,
                }
            })
        })
    )

    const author = await db.author.findFirst({
        where: {
            firstName: 'Harsh',
        }
    })?? { id: 0 };

    for (const book of getBooks()) {
        const { title, isFiction, datePublished } = book;
        const bookData = {
            title,
            isFiction,
            datePublished,
            authorId: author.id, // Ensure that author is not undefined
        };

        await db.book.create({
            data: bookData,
        });
    }
}

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: 'Harsh',
            lastName: 'Kushwah',
            phone: '1234567890',
        },
        {
            firstName: 'PC',
            lastName: 'Lenovo',
            phone: '1234567890',
        },
        {
            firstName: 'Xiaomi',
            lastName: 'Mobile',
            phone: '1234567890',
        }
    ];
}

function getBooks(): Array<Book> {
    return [
        {
            title: 'TypeScript: Born to create ruckus',
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: 'Silas Mariner',
            isFiction: true,
            datePublished: new Date(),
        },
        {
            title: 'Finance: Way to billionare',
            isFiction: false,
            datePublished: new Date(),
        }
    ];
}