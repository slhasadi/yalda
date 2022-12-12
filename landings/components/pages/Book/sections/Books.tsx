import BookCard from "../BookCard";
import Stack from "../../../commons/Stack";
import { useContext } from "react";
import BookContext from "contexts/BookContext";

const Books = () => {
    const bookList = useContext(BookContext);

    return <section className='mb-12'>
        <Stack className='flex-col gap-4'>
                <BookCard books={bookList}/>
        </Stack>
    </section>

}

export default Books;