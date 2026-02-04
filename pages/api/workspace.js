import { workspaceData } from '../../data/workspace';

export default function handler(req, res) {
  res.status(200).json(workspaceData);
}
