import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('event handlers is called with th reight details when create blog is clicked', async () => {
        const addBlog = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm addBlog={addBlog}/>)

        const titleInput = screen.getByPlaceholderText('Title')
        const authorInput = screen.getByPlaceholderText('Author')
        const urlInput = screen.getByPlaceholderText('URL')

        const submitButton = screen.getByText('Create')

        await user.type(titleInput, 'I will Survive')
        await user.type(authorInput, 'Gloria Gaynor')
        await user.type(urlInput, 'youtube.com')

        await user.click(submitButton)

        expect(addBlog.mock.calls).toHaveLength(1)
        console.log(addBlog.mock.calls)

        expect(addBlog.mock.calls[0][0]).toStrictEqual({
            title: 'I will Survive',
            author: 'Gloria Gaynor',
            url: 'youtube.com'
        })
    })
})