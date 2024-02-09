export interface CreateGroup {
  name: string;
  description: string;
  image_url: string | URL;
  creator_uuid: string;
}
