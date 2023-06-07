import dayjs from "dayjs";
import dayjsDuration from "dayjs/plugin/duration";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Post } from "@prisma/client";
import { Link } from "react-router-dom";
import { usePostDelete } from "../queries/post.query";

dayjs.extend(dayjsDuration);
dayjs.extend(dayjsRelativeTime);

interface PostCardProps extends Post {}

export default function PostCard({ id, image, title, content, createdAt }: PostCardProps) {
  const deleteMutation = usePostDelete();

  return (
    <Card direction={{ base: "column", sm: "row" }} width="full" overflow="hidden" variant="outline">
      <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={image} alt="Caffe Latte" />

      <Stack w="full">
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">{content}</Text>
        </CardBody>

        <CardFooter justifyContent="space-between" alignItems="center">
          <HStack>
            <Link to={`/update/${id}`}>
              <IconButton aria-label="Edit Post" icon={<EditIcon />} />
            </Link>
            <IconButton
              colorScheme="red"
              aria-label="Edit Post"
              icon={<DeleteIcon />}
              onClick={() => deleteMutation.mutate(id)}
            />
            {/* <Button variant="solid" colorScheme="blue">
              Read More
            </Button> */}
          </HStack>

          {dayjs.duration(dayjs().diff(createdAt)).humanize(true)}
        </CardFooter>
      </Stack>
    </Card>
  );
}
