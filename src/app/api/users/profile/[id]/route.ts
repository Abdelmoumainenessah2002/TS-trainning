import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import { JWTToken } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";


interface Props {
    params: {
        id: string;
    };
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @description Delete user
 * @access private
*/

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const { id } = params;
        

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            });
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // function to verify token
        const userFromToken = verifyToken(request);

        if (userFromToken != null && userFromToken.id === user.id) {
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });

            return NextResponse.json({ message: "User removed successfully" });
        }

        return NextResponse.json({ message: "You are not authorized to delete this user , //forbidden" }, { status: 403 });

        
    } catch (error) {
        return NextResponse.json({ message: "internel server error" }, { status: 500 });
    }
}
