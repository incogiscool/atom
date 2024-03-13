import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";

export const CreatePostModal = () => {
  function handleCreateNewPost() {}

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button onClick={handleCreateNewPost} className="w-full">
          Create new post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>
        <div>
          {/* <Form>
                <form>

                </form>
            </Form> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
