import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  LoadingSpinner,
  LoadingPage,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
} from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    render(<LoadingSpinner text="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should apply size classes', () => {
    const { container } = render(<LoadingSpinner size="xl" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('h-12', 'w-12');
  });
});

describe('LoadingPage', () => {
  it('should render full page loading', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    render(<LoadingPage text="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
});

describe('Skeleton', () => {
  it('should render single skeleton', () => {
    const { container } = render(<Skeleton />);
    const skeletons = container.querySelectorAll('[aria-label="Loading content"]');
    expect(skeletons).toHaveLength(1);
  });

  it('should render multiple skeletons', () => {
    const { container } = render(<Skeleton count={3} />);
    const skeletons = container.querySelectorAll('[aria-label="Loading content"]');
    expect(skeletons).toHaveLength(3);
  });
});

describe('CardSkeleton', () => {
  it('should render card skeleton', () => {
    const { container } = render(<CardSkeleton />);
    expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
  });
});

describe('TableSkeleton', () => {
  it('should render table skeleton with default rows', () => {
    const { container } = render(<TableSkeleton />);
    const rows = container.querySelectorAll('.flex.items-center');
    expect(rows).toHaveLength(5);
  });

  it('should render custom number of rows', () => {
    const { container } = render(<TableSkeleton rows={3} />);
    const rows = container.querySelectorAll('.flex.items-center');
    expect(rows).toHaveLength(3);
  });
});