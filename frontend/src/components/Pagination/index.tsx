import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PageNumber
                    key={i}
                    isActive={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </PageNumber>
            );
        }
        return pageNumbers;
    };

    return (
        <PaginationContainer>
            <ArrowButton onClick={handlePrevious} disabled={currentPage === 1}>
                <AiOutlineLeft />
            </ArrowButton>
            {renderPageNumbers()}
            <ArrowButton onClick={handleNext} disabled={currentPage === totalPages}>
                <AiOutlineRight />
            </ArrowButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageNumber = styled.span<{ isActive: boolean }>`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  color: ${({ isActive }) => (isActive ? '#d69616' : '#000')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
 // border: ${({ isActive }) => (isActive ? '1px solid #d69616' : 'none')};
`;

const ArrowButton = styled.button<{ disabled: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? '#ddd' : '#d69616')};
  font-size: 16px;
  display: flex;
  align-items: center;
  
  &:disabled {
    cursor: not-allowed;
  }
`;
