import * as Yup from "yup";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Heading, VStack, Button, Input } from "@chakra-ui/react";

import TextField from "../../components/text-field";
import TextareaField from "../../components/text-area-field";
import { usePost, usePostCreate, usePostUpdate } from "../../queries/post.query";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image is required"),
  content: Yup.string().required("Content is required"),
}).required();

export default function CreateUpdate() {
  const params = useParams();
  const postId = params.id;
  const navigate = useNavigate();
  const { data } = usePost(postId);
  const createMutation = usePostCreate();
  const updateMutation = usePostUpdate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (postId && !isEmpty(data)) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("image", data.image);
    }
  }, [data, postId]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (postId) {
        await updateMutation.mutateAsync({ ...data, id: postId });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate("/");
    } catch (error) {
      alert("Error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading size="lg">{postId ? "Edit" : "Create new"} Posts</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={6} spacing={4}>
          <TextField placeholder="Title" {...register("title")} error={errors?.title?.message as string} />
          <TextField
            placeholder="Image Link"
            {...register("image")}
            error={errors?.image?.message as string}
          />
          <TextareaField
            placeholder="Content"
            {...register("content")}
            rows={6}
            error={errors?.content?.message as string}
          />
          <Button width="100%" type="submit" isLoading={loading}>
            {postId ? "Edit" : "Create"}
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
