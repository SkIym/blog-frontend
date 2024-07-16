import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let deleteBlog
    let updateBlog
    beforeEach(() => {
        const blog = {
            title: 'test',
            author: 'test',
            url: 'test',
            likes: '1',
            user: {
                name: 'testUser',
                username: 'test_user'
            }
        }
        deleteBlog = vi.fn()
        updateBlog = vi.fn()
        container = render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>).container

    })
    test('renders blog title and author', () => {
        const mustBeRendered = container.querySelector('.blog-always-shown')
        expect(mustBeRendered).toBeDefined()
    })

    test('does not render url and likes by default', () => {
        const mustNotBeRendered = container.querySelector('.blog-details')
        expect(mustNotBeRendered).toBeNull()
    })

    test('renders url and likes when view button is clicked', async () => {
        const button = screen.getByText('View')
        const user = userEvent.setup()

        await user.click(button)
        
        const mustBeRendered = container.querySelector('.blog-details')
        expect(mustBeRendered).toBeDefined()
    })

    test('event handler is called twice after clicking the like button twice', async () => {
        const button = screen.getByText('View')
        const user = userEvent.setup()

        await user.click(button)

        const likeButton = container.querySelector('.heart-button')

        await user.click(likeButton)
        await user.click(likeButton)
        
        expect(updateBlog.mock.calls).toHaveLength(2)
    })

})