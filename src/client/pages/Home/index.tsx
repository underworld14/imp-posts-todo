import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Heading, VStack, Input, Button, HStack } from "@chakra-ui/react";

import { usePosts } from "../../queries/post.query";
import useDebounce from "../../hooks/use-debounce";
import PostCard from "../../components/post-card";
import Pagination from "../../components/pagination";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data } = usePosts({
    page,
    size: 5,
    search: debouncedSearch,
  });

  return (
    <Container maxW="container.md" py={10}>
      <Heading size="lg">The Posts lists</Heading>
      <HStack mt={4} align="center">
        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button>
          <Link to="/create">Create Post</Link>
        </Button>
      </HStack>
      <VStack mt={6} spacing={4}>
        {data?.data?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </VStack>
      <Pagination
        currentPage={page}
        totalPages={data?.meta?.totalPages}
        onPageChange={(page) => setPage(page)}
      />
    </Container>
  );
}
