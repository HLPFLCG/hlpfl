import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkipLink } from '../SkipLink'

describe('SkipLink', () => {
  it('renders skip link with correct text', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toBeInTheDocument()
  })

  it('has correct href attribute', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('has correct aria-label', () => {
    render(<SkipLink />)
    const link = screen.getByLabelText('Skip to main content')
    expect(link).toBeInTheDocument()
  })

  it('is visually hidden by default', () => {
    render(<SkipLink />)
    const link = screen.getByText('Skip to main content')
    expect(link).toHaveClass('sr-only')
  })
})