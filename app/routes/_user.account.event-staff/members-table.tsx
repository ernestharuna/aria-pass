import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

export default function MembersTable({ members }: { members: EventMember[] }) {
    return (
        <Table className="border">
            <TableCaption>A list of added members.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Email</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Member's Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Invite Token</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map((member) => (
                    <TableRow key={member.id} className="h-14">
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                            <div className="rounded bg-gray-100 text-primary uppercase text-xs px-2 py-1 w-fit">
                                {member.status}
                            </div>
                        </TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell className="capitalize">{member.role}</TableCell>
                        <TableCell>{member.inviteToken}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total Entries</TableCell>
                    <TableCell className="text-right">
                        {members.length} member(s)
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
