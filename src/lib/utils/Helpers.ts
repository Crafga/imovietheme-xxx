export const getPageRange = (currentPage: number, totalPages: number) => {
    let pages: (number | string)[] = [];
    const maxPagesToShow = 1;

    if (totalPages <= 10) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1, 2, 3]; // หน้าแรก
      if (currentPage > 5) pages.push("...");

      // แสดงหน้าก่อน & หลังหน้าปัจจุบัน
      for (let i = Math.max(4, currentPage - maxPagesToShow); i <= Math.min(totalPages - 3, currentPage + maxPagesToShow); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 4) pages.push("...");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }
    return pages;
}

export const getRandomItems = <T>(array: T[] | undefined | null, count: number = 20): T[] => {
    if (!array || array.length === 0) {
        return [];
    }
    
    if (array.length <= count) {
        return [...array];
    }
    
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
}