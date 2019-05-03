class SlotError extends Error { }

class Book {
    constructor(id, height, colour, title) {
    	this.id = id;
        this.height = height;
        this.colour = colour;
        this.title = title;
    }
}

var bookBank = {
    'book_1': new Book(1, 2, 'red', 'red book'),
    'book_2': new Book(2, 10, 'blue', 'blue book')
}

class Bookshelf {
    constructor(books){
        this.books = books.slice();
    }

    Add(book, position) {
        if (position >= this.books.length) {
            throw new RangeError('Could not add book to shelf; index higher than bookshelf size.');
        }

        if (this.books[position] !== null) {
            throw new SlotError("Bookshelf slot already contains a book.")
        }

        this.books[position] = book;
    }

    Remove(position) {
        if (position >= this.books.length) {
            throw new RangeError('Could not add book to shelf; index higher than bookshelf size.');
        }

        if (this.books[position] === null) {
            throw new SlotError("Bookshelf slot does not contain a book to remove.");
        }

        var result = this.books[position];
        this.books[position] = null;

        return result;
    }
}

/*
class Bookcase {
    contructor(bookshelf) {
        this.mainBookshelf = bookshelf;
        this.mainBookshelfSplits = [];

        this.addedBookshelves = [];
    }
}
*/

export { Book };